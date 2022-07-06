/**
 * External Dependencies
 */
import create from 'zustand';

interface IVending {
    isLoading: boolean; // loading
    message: string;  // message
    currentProd: number; // selected the product id
    setLoading: (loading: boolean) => void,
    setMessage: (msg: string) => void
    setCurrentProd: (id: number) => void,
};

const useStore = create<IVending>((set) => ({
    isLoading: false,
    message: '',
    currentProd: 0,
    setLoading: (loading: boolean) => {
        set(() => ({
            isLoading: loading
        }));
    },
    setMessage: (msg: string) => {
        set(() => ({
            message: msg
        }));
    },
    setCurrentProd: (id: number) => {
        set(() => ({
            currentProd: id
        }))
    },
}));

export default useStore;