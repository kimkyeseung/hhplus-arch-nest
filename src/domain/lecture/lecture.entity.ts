export class Lecture {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly instructorName: string,
    public readonly date: Date,
    public readonly participants: number[] = [],
  ) {}

  isFull(): boolean {
    return this.participants.length >= 30;
  }

  addParticipant(userId: number): void {
    if (this.isFull()) {
      throw new Error('Lecture is already full');
    }
    if (this.participants.includes(userId)) {
      throw new Error('User is already registered for this lecture');
    }
    this.participants.push(userId);
  }
}
