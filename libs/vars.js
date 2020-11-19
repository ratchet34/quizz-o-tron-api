const gameStates = [
    '00_init',
    '01_host_start',
    '02_all_youtube_ready',
    '03_item_start',
    '04_item_running',
    '05_next_item',
    '99_end'
];

const stateStartItem = 2;
const stateNextItem = 5;

const itemTypes = ['audio', 'video'];

module.exports = { gameStates, itemTypes, stateStartItem, stateNextItem }