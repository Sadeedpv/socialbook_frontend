import create from 'zustand';

export const useStore = create(set => ({
    Posts: [],
    setPosts: (posts) => set(state => ({Posts: posts}))
}))