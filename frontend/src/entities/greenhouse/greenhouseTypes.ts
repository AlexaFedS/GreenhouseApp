export interface GreenhouseData {
    id: number;
    name: string;
    hight: number;
    width: number;
    length: number;
    description: string;
    sensors: SensorData[];
}

export interface SensorData {
    id: number;
    name: string;
    standart: number;
    idGreenhouse: number;
}

export interface GreenhouseClimateData {
    id: number;
    value: number;
    idSensor: number;
}

export interface NewGreenhouseBody {
    name: string;
    hight: number;
    width: number;
    length: number;
    description: string;
    idUser: number;
}

export interface EditGreenhouseBody extends NewGreenhouseBody {
    id: number;
    sensors: SensorData[];
    newSensors: Omit<SensorData, 'id'>[];
    deleteSensors: ({ delete: boolean } & SensorData)[];
}

export type StatsData = Record<
    string,
    Array<{
        id: number;
        value: number;
        time: string;
    }>
>;
