// TODO possibly convert to class with more util methods
export default function toVideoDuration(time) {
    let hours, minutes, seconds, group;

    group = [];
    hours = Math.floor(time /  3600);
    minutes = Math.floor(time % 3600 / 60);
    seconds = Math.floor(time % 3600 % 60);

    if (hours > 0) { group.push((hours > 9) ? hours : "0" + hours); }
    group.push((minutes > 9) ? minutes : "0" + minutes);
    group.push((seconds > 9) ? seconds : "0" + seconds);

    return group.join(":");
}