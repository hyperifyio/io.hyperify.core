interface MaventaAction {
    type: string;
    channel: string;
    message: string | null;
    key: string | null;
    happened_at: string;
}

export { MaventaAction }