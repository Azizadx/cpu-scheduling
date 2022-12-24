class Task {
    constructor(name, iterations, priority = 1) {
        this.name = name
        this.index = 0;
        this.iterations = iterations;
        this.priority = priority;
    }
    run() {
        this.index++;
        process.stdout.write(this.name + " " + Math.floor((this.index / this.iterations) * 100) + "% \r");
    }

    onFinish() {
        console.log(this.name + " 100%")
    }
};

class Scheduler {
    // ...
    constructor(timeSlotPerTask) {
        this.tasks = [];
        this.timeSlotPerTask = timeSlotPerTask;
    }

    addTask(task) {
        this.tasks.push(task)
    }
    sort() {
        this.tasks.sort((a, b) => a.priority - b.priority)
    }

    run() {
        this.sort();
        while (this.tasks.length) {
            if (this.tasks[0].index < this.tasks[0].iterations) {
                this.tasks[0].run();
            }
            else {
                this.tasks[0].onFinish();
                this.tasks.shift();
                this.sort();
            }
        }
    }
}


const scheduler = new Scheduler();

scheduler.addTask(new Task("A", 100000, 3));
scheduler.addTask(new Task("B", 200000, 2));
scheduler.addTask(new Task("C", 1000, 4));
scheduler.addTask(new Task("D", 2000, 1));

scheduler.run();