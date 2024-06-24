const formatDateUntilSecond = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    date.setHours(date.getHours() - 7);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // tháng bắt đầu từ 0 nên cần cộng 1
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

export default formatDateUntilSecond
