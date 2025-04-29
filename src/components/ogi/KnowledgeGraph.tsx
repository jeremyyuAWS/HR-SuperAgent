import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { OGINode, OGILink } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

interface KnowledgeGraphProps {
  nodes: OGINode[];
  links: OGILink[];
}

const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!svgRef.current || !containerRef.current || nodes.length === 0) return;
    
    const width = containerRef.current.clientWidth;
    const height = 500; // Increased height for better visibility
    
    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Create SVG element
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);
    
    // Define the color scale for different node categories
    const colorScale = d3.scaleOrdinal()
      .domain(['policy', 'process', 'metric', 'concept'])
      .range(['#404040', '#606060', '#808080', '#A0A0A0']);
    
    // Create a simulation for positioning nodes
    const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius((d: any) => d.size + 5));
    
    // Draw the links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", theme === 'dark' ? "#4B5563" : "#D1D5DB")
      .attr("stroke-opacity", (d) => d.strength)
      .attr("stroke-width", (d) => 1 + d.strength);
    
    // Create node group
    const node = svg.append("g")
      .selectAll(".node")
      .data(nodes)
      .join("g")
      .attr("class", "node")
      .call(d3.drag<SVGGElement, OGINode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);
    
    // Add circles to nodes
    node.append("circle")
      .attr("r", (d) => d.size / 2)
      .attr("fill", (d) => `${colorScale(d.category)}`)
      .attr("fill-opacity", 0.8)
      .attr("stroke", (d) => `${colorScale(d.category)}`)
      .attr("stroke-width", 1.5);
    
    // Add labels to nodes
    node.append("text")
      .attr("dx", 0)
      .attr("dy", (d) => -d.size / 2 - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", theme === 'dark' ? "#D1D5DB" : "#4B5563")
      .text((d) => d.label);
    
    // Add a subtle pulse animation to important nodes
    node.filter((d) => d.size > 30)
      .append("circle")
      .attr("r", (d) => d.size / 2)
      .attr("fill", "none")
      .attr("stroke", (d) => `${colorScale(d.category)}`)
      .attr("stroke-width", 1)
      .attr("opacity", 0.5)
      .attr("class", "pulse");
    
    // Add pulse animation
    const pulse = svg.selectAll(".pulse");
    
    function pulseAnimation() {
      pulse
        .transition()
        .duration(1500)
        .attr("r", (d: any) => d.size / 2 + 10)
        .attr("opacity", 0)
        .on("end", function(this: SVGCircleElement) {
          d3.select(this)
            .attr("r", (d: any) => d.size / 2)
            .attr("opacity", 0.5)
            .transition()
            .delay(Math.random() * 1000)
            .on("start", pulseAnimation);
        });
    }
    
    pulseAnimation();
    
    // Update positions in the simulation
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
        
      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });
    
    // Drag functions for simulation
    function dragstarted(event: d3.D3DragEvent<SVGGElement, OGINode, any>, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event: d3.D3DragEvent<SVGGElement, OGINode, any>, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event: d3.D3DragEvent<SVGGElement, OGINode, any>, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      svg.attr("width", newWidth);
      simulation.force("center", d3.forceCenter(newWidth / 2, height / 2));
      simulation.alpha(0.3).restart();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      simulation.stop();
    };
  }, [nodes, links, theme]);
  
  return (
    <div ref={containerRef} className="w-full h-[500px] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default KnowledgeGraph;