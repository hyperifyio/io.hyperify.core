export interface MaventaAction {
    readonly type: string;
    readonly channel: string;
    readonly message: string | null;
    readonly key: string | null;
    readonly happened_at: string;
}