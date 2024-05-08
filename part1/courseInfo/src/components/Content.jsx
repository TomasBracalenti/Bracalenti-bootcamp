import Part from './Part';

const Content = (course) => {
    const part1 = course.parts[0];
    const part2 = course.parts[1];
    const part3 = course.parts[2];
    return (
    <div>
        <Part part={part1.name} exercises={part1.exercises1} />
        <Part part={part2.name} exercises={part2.exercises2} />
        <Part part={part3.name} exercises={part3.exercises3} />
    </div>
    );
}

export default Content;