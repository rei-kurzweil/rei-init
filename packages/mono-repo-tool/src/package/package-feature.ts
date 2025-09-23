import * as fs from "fs-extra";
import * as path from "path";

import { PackageFeatureIntegrationType } from "./package-feature-integration-type";

/**
 * prefab features (mini-packages) that can be added to packages 
 * + makes it easier to combine or fork packages
 */
export class PackageFeature {
    constructor(
        public readonly name: string,
        public readonly path_to_feature: string, // relative to repo root
        public readonly integrationType: PackageFeatureIntegrationType = PackageFeatureIntegrationType.COPY_MODULE,
        public readonly options?: {
            custom_insertion_logic?: () => Promise<void>
        }
    ) {

    }

    public async addFeatureToPackage(
        package_dir: string // relative to repo root
    ): Promise<void> {
        if (this.integrationType === PackageFeatureIntegrationType.COPY_MODULE) {
            await this.copyModule(package_dir);
        } else {
            throw new Error(`Integration type ${this.integrationType} not implemented yet`);
        }
    }

    private async copyModule(package_dir: string): Promise<void> {
        // copy module to package
        const source = path.resolve(this.path_to_feature);
        const destination = path.resolve(package_dir, "prefab-features", this.name);
        await fs.copy(source, destination);
    }
}