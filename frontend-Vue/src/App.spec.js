import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import App from '@/App.vue';
import Header from '@/components/Header/Header.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { nextTick } from 'vue';
const routes = [
  {
    path: '/',
    component: { template: '<div>Home</div>' },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe('App.vue', () => {
  it('renders Header component', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.findComponent(Header).exists()).toBe(true);
  });

  it('renders RouterView when navigating to home', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    await router.push('/');
    await nextTick();

    expect(wrapper.html()).toContain('Home');
  });
});
