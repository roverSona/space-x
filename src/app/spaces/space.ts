interface Cores {
    land_success: boolean;
    landing_intent: boolean;
    legs: boolean;
    reused: boolean;
}

export interface Space {
    links: {
        mission_patch_small: string;
    };
    mission_name: string;
    flight_number: number;
    launch_success: boolean;
    launch_year: string;
    mission_id: string[];
    details: string;
    is_tentative: boolean;
    rocket: {
        first_stage: {
            cores: Cores[]
        }
    };
}

export interface Filters {
    limit: number;
    launch_success?: string;
    land_success?: string;
    launch_year?: string;
}
