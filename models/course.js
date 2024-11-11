class Course {
    constructor(entry) {
        this.id = entry.id;
        this.name = entry.name;
        this.price = entry.price;
        this.begin = entry.begin;
        this.end = entry.end;
    }
}

module.exports = Course;