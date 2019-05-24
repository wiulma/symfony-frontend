interface StorageServiceInterface {

    save(key: string, data: Object): Promise<any>;

    get(key: any): Promise<any>;

    delete(key: any): Promise<any>;

    clear(): void;

}