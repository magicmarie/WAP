// exercise 3

type Student = { student_id: string, firstname: string; lastname: string; grade: number; };
type Course = Record<string, { title: string, students: Student[]; }>; // example: { 'CS472': { title: 'Web Application Programming', students: [] }}

export class Exercise3 {
  #courses: Course[] = [];

  add_course(course_code: string, course_title: string): boolean {
    if (course_code in this.#courses) {
      return false;
    }

  this.#courses[course_code] = { title: course_title, students: [] };
  return true;
  }

  update_course_title(course_code: string, new_course_title: string): boolean {
    if (course_code in this.#courses) {
      this.#courses[course_code].title = new_course_title;
      return true;
    }

    return false;
  }

  delete_course(course_code: string): boolean {
    if (!(course_code in this.#courses)) {
      return false;
    }

    this.#courses = this.#courses.filter(course => !course[course_code]);
    return true;
  }

  get_course_title_by_code(course_code: string): string {
      return (course_code in this.#courses) ? this.#courses[course_code].title : "Course not found";
  }

  enroll_student_in_course(course_code: string, student: Partial<Student>): boolean {
    if (!(course_code in this.#courses) || (this.#courses[course_code].students.find(s => s.student_id === student.student_id))) {
      return false;
    }
    const fullStudent = { ...student, grade: 0 };

    this.#courses[course_code].students.push(fullStudent);
    return true;
  }

  remove_student_from_course(course_code: string, student_id: string): boolean {
    if (!(course_code in this.#courses) || (!(this.#courses[course_code].students.find(student => student.student_id === student_id)))) {
      return false;
    }

    this.#courses[course_code].students = this.#courses[course_code].students.filter(student => student.student_id !== student_id);
    return true;
  }

  update_student_grade(course_code: string, student_id: string, grade: number): boolean {
    if (!(course_code in this.#courses) || (!(this.#courses[course_code].students.find(student => student.student_id === student_id)))) {
      return false;
    }

    this.#courses[course_code].students = this.#courses[course_code].students.map(student =>
      student.student_id === student_id ? { ...student, grade } : student
    );

    return true;
  }

  get_student_grade(course_code: string, student_id: string): number {
    if (!(course_code in this.#courses) || (!(this.#courses[course_code].students.find(student => student.student_id === student_id)))) {
      return 0;
    }

    return this.#courses[course_code].students.find(student => student.student_id === student_id).grade;
  }

  get_courses(): Course[] {
    return this.#courses;
  }
}

const x = new Exercise3();
console.log("first", x.get_courses()); // []
console.log(x.add_course('CS472', 'Web Application Programming')); // true
console.log(x.add_course('CS572', 'Web Programming')); // true
console.log(x.add_course('CS572', 'Web Programming')); // false

console.log("second", x.get_courses()); // { CS472: { title: 'Web Application Programming', students: [] }, CS572: { title: 'Web Programming', students: [] } }
console.log(x.get_course_title_by_code('CS472')); // Web Application Programming
console.log(x.get_course_title_by_code('CS572')); // Web Programming
console.log(x.get_course_title_by_code('CS573')); // Course not found

const y: Partial<Student> = { student_id: '1', firstname: 'John', lastname: 'Doe' };
const z: Partial<Student> = { student_id: '2', firstname: 'Jane', lastname: 'Doe' };
console.log(x.enroll_student_in_course('CS472', y)); // true
console.log(x.enroll_student_in_course('CS472', y)); // false
console.log(x.enroll_student_in_course('CS472', z)); // true

console.log(x.get_courses());
