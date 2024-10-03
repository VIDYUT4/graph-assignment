import { ref, onMounted } from 'vue';
import * as d3 from 'd3';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export function buildHierarchy(data) {
  const map = Object.fromEntries(data.map(item => [item.name, { ...item, children: [] }]));
  return data.reduce((acc, item) => {
    item.parent ? map[item.parent].children.push(map[item.name]) : acc.push(map[item.name]);
    return acc;
  }, []);
}

export function useGraph(apiUrl, emit) {
  const chart = ref(null);
  const selectedNodes = ref([]);
  const error = ref(null);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (err) {
      error.value = err.message;
      return null;
    }
  };
  const notify = (data) => {
   toast.info(
    `<strong>Name: ${data.name}</strong><br />Description: ${data.description}`,
    {
      dangerouslyHTMLString: true,
      position: "top-right",
      toastId: data.name,
      closeButton: true,
      closeOnClick: false,
      autoClose: 5000,
      // onClose: deselectAllNodes, // Callback when the toast is closed
    }
  )};
  const drawChart = async () => {
    const data = await fetchData();
    if (!data || !data.length) return (error.value = 'No data found');

    const root = d3.hierarchy(buildHierarchy(data)[0]);
    if (!chart.value) {
      console.error("Chart reference is not set.");
      return;
    }
    const svg = d3.select(chart.value)
      .append('svg')
      .attr('width', 1000)
      .attr('height', 500)
      .append('g')
      .attr('transform', 'translate(100, 50)');

    d3.tree().size([500, 700])(root);

    // Draw links
    svg.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', d3.linkHorizontal().x(d => d.y).y(d => d.x))
      .style('fill', 'none')
      .style('stroke', '#0fce87')
      .style('stroke-width', '1px');

    // Draw nodes
    const node = svg
      .selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.y},${d.x})`)
      .each(function (d) {
        d.element = this;
      })
      .on('click', (event, d) => {
        handleNodeClick(d);
        emit('node-selected', d.data);
      });

    node.append('rect')
      .attr('width', 80)
      .attr('height', 60)
      .attr('x', -40).attr('y', -30)
      .attr('rx', 10).attr('ry', 10)
      .style('fill', '#fa921b')
      .style('cursor', 'pointer')
      .style('stroke', '#bb1b1b')
      .style('stroke-width', '2px')
      .on('mouseover', function () { d3.select(this).style('fill', '#cc8611') })
      .on('mouseout', function (event, d) {
        d3.select(this).style('fill', selectedNodes.value.includes(d) ? '#c7640c' : '#fa921b');
      });

    node.append('text')
      .attr('dy', '0.2em').attr('dx', '-0.6em')
      .attr('text-anchor', 'right')
      .text(d => d.data.name)
      .style('fill', '#fff').style('cursor', 'pointer').attr('font-size', '16px');
  };

  const handleNodeClick = (nodeData) => {
    deselectAllNodes();
    selectedNodes.value.push(nodeData);
    d3.select(nodeData.element).select('rect')
      .style('fill', '#c7640c')
      .style('filter', 'drop-shadow(1px 2px 3px rgba(0, 0, 0, 0.5))');
    notify(nodeData.data)
  };

  const deselectAllNodes = () => {
    selectedNodes.value.forEach((node) => {
      d3.select(node.element).select('rect').style('fill', '#fa921b').style('filter', 'none');
    });
    selectedNodes.value = [];
  };

  onMounted(drawChart);

  return { chart, selectedNodes, deselectAllNodes, error };
}
