

export interface UptimeMonitor {
    id: number;
    friendly_name: string;
    url: string;
    type: 1;
    sub_type: string;
    keyword_type: null; // ?
    keyword_case_type: null; // ?
    keyword_value: string;
    port: string;
    interval: number;
    timeout: number;
    status: 2 | 9; // 2 = online, 9 = offline
    create_datetime: number;
}