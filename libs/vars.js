const gameStates = [
    '00_init',
    '01_host_start',
    '02_all_players_on_app',
    '03_all_youtube_ready',
    '04_item_start',
    '05_item_running',
    '06_next_item',
    '99_end'
];

const stateStartItem = 3;
const stateNextItem = 6;

const itemTypes = ['audio', 'video'];

module.exports = { gameStates, itemTypes, stateStartItem, stateNextItem }