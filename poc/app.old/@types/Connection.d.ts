declare type ConnectionData = {
    idConnection: number,
    name?: string,
    type?: string,
    connString?: string
}

declare type DatabaseStructure = {
    id: string;
    schemaName: string;
    tableName: string;
    columnName: string;
    dataType: string;
    nullable: string;
    defaultValue: string;
    primaryKey: string;
    foreignKey: string;
    uniqueKey: string;
    comments: string;
    primaryTableName: string;
    primaryTableColumn: string;
    joinCondition: string;
}


declare type TableStructure = {
    tableName: string
    columns: ColumnStructure[],
    connections: TableConnection[],
}

declare type ColumnStructure = {
    id: string,
    columnName: string,
    dataType: string,
    nullable: string,
    primaryKey: string,
    foreignKey: string
} 

declare type TableConnection = {
    joinCondition: string,
    primaryTableColumn: string,
    primaryTableName: string,
    columnName: string
}

declare type ConnectionDetailRouteParams = {
    connectionid: string;
}
