export function calculateAccuracy(correctAnswers: number, totalQuestions: number): number {
    if (totalQuestions === 0) {
        return 0;
    }
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
    return accuracy;
}