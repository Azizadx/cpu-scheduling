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
    // ...
    constructor(timeSlotPerTask) {
        this.tasks = [];
        this.timeSlotPerTask = timeSlotPerTask;
    }

    addTask(task) {
        this.tasks.push(task)
    }

    sort() {
        // total iterations minus index gives us pending task/iterations
        this.tasks.sort((a, b) => (a.iterations - a.index) - (b.iterations - a.index));
    }

    run() {
        this.sort(); // sort once before while loop
        while (this.tasks.length) {
            if (this.tasks[0].index < this.tasks[0].iterations) {
                this.tasks[0].run();
            }
            else {
                this.tasks[0].onFinish();
                this.tasks.shift();
                this.sort(); // sort before starting next cycle, in case a new task was added to the list
            }
        }
    }
}


const scheduler = new Scheduler();

scheduler.addTask(new Task("A", 100000));
scheduler.addTask(new Task("B", 200000));
scheduler.addTask(new Task("C", 1000));
scheduler.addTask(new Task("D", 2000));

scheduler.run();