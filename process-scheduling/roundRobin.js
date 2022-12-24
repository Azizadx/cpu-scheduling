class Task {
    constructor(name, iterations) {
        this.name = name
        this.index = 0;
        this.iterations = iterations;
    }

    run() {
        this.index++;
        process.stdout.write(this.name + " " + Math.floor((this.index / this.iterations) * 100) + "% \r");
    }

    onFinish() {
        console.log(this.name + " 100%")
    }
}
class Scheduler {
    constructor(timeSlotPerTask) {
        this.tasks = [];
        this.timeSlotPerTask = timeSlotPerTask;
    }

    addTask(task) {
        this.tasks.push(task)
    }

    run() {
        let lastSetDate = Date.now();
        while (this.tasks.length) {
            if (Date.now() - lastSetDate > this.timeSlotPerTask) {
                this.tasks.push(this.tasks.shift());
                lastSetDate = Date.now();
                if (this.tasks.length > 1) {
                    console.log("");
                }
            }
            if (this.tasks[0].index < this.tasks[0].iterations) {
                this.tasks[0].run();
            }
            else {
                this.tasks[0].onFinish();
                this.tasks.shift();
            }
        }
    }
}


const scheduler = new Scheduler(1000); // time per slot will be 1 second

scheduler.addTask(new Task("A", 1000000));
scheduler.addTask(new Task("B", 2000000));
scheduler.addTask(new Task("C", 1000000));
scheduler.addTask(new Task("D", 3330000));

scheduler.run();