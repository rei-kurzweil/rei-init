export interface Repository<Entity> {


    getById(id: string): Promise<Entity | null>;
    getAll(pageSize?: number, page?: number): Promise<Entity[]>;
    getAllWhereNameLike(name: string, pageSize?: number, page?: number): Promise<Entity[]>;

    save(entity: Entity): Promise<void>;
    delete(id: string): Promise<void>;


}