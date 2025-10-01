export interface Repository<Entity> {

    findById(id: number): Promise<Entity | null>;
    
    findAll(pageSize?: number, page?: number): Promise<Entity[]>;
    findAllWhereNameLike(name: string, pageSize?: number, page?: number): Promise<Entity[]>;

    save(entity: Entity): Promise<void>;
    delete(id: string): Promise<void>;


}