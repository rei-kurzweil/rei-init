import { MicroBus } from '@rei-init/micro-bus';
export { MicroBus } from '@rei-init/micro-bus';

interface IslandConfig<T = any> {
    component: React.ComponentType<any>;
    selector: string;
    props?: T;
}
interface IslandMountOptions {
    microBus?: MicroBus;
    onMount?: (selector: string, props: any) => void;
    onError?: (selector: string, error: Error) => void;
}
/**
 * Mount multiple React components as islands with different props
 * All islands share the same micro-bus instance
 */
declare function mountMultipleIslands(islandConfigs: IslandConfig[], options?: IslandMountOptions): MicroBus;
/**
 * Mount a single island (convenience function)
 */
declare function mountSingleIsland<T extends React.ComponentType<any>>(Component: T, selector: string, props?: React.ComponentProps<T>, microBus?: MicroBus): MicroBus;
/**
 * Auto-mount islands based on data attributes
 * Looks for elements with data-spa-island attribute
 */
declare function autoMountIslands<T extends React.ComponentType<any>>(Component: T, options?: IslandMountOptions): MicroBus;

export { type IslandConfig, type IslandMountOptions, autoMountIslands, mountMultipleIslands, mountSingleIsland };
