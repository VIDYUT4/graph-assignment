import { mount } from '@vue/test-utils';
import Home from '@/views/HomeView.vue'; 
import { useGraph } from '@/composables/useGraph.js'; 
import { ref } from 'vue';
import { vi, describe, it, expect, beforeEach } from 'vitest'; 


vi.mock('@/composables/useGraph.js');

describe('Home.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays an error message when an error occurs', async () => {
    const error = ref('An error occurred');
    useGraph.mockReturnValue({
      chart: {},
      selectedNodes: ref([]),
      deselectAllNodes: vi.fn(),
      error,
    });

    const wrapper = mount(Home);

    expect(wrapper.find('.error').text()).toBe('An error occurred');
  });

  it('renders the graph container', () => {
    useGraph.mockReturnValue({
      chart: {},
      selectedNodes: ref([]), 
      deselectAllNodes: vi.fn(),
      error: ref(null),
    });

    const wrapper = mount(Home);

    expect(wrapper.find('.graph').exists()).toBe(true);
  });
});
