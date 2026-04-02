import { QcmQuestionExamResponse } from "@/types/topic/topic";

interface ExamQcmQuestionProps {
    question: QcmQuestionExamResponse;
    selectedValue: number | null;
    onSelect: (index: number) => void;
}

export function ExamQcmQuestion({ question, selectedValue, onSelect }: ExamQcmQuestionProps) {
    return (
        <div className="w-full bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 sm:p-10 mb-6 transition-all">
            <h3 className="text-2xl sm:text-3xl font-medium text-gray-800 mb-8 text-center leading-tight">
                {question.question}
            </h3>
            
            <div className="space-y-4">
                {question.options.map((option, idx) => {
                    const isSelected = selectedValue === idx;
                    
                    return (
                        <button 
                            key={idx} 
                            onClick={() => onSelect(idx)}
                            className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 font-medium text-[15px] sm:text-lg flex items-center group ${
                                isSelected 
                                    ? "border-indigo-500 bg-indigo-50 text-indigo-800 shadow-sm" 
                                    : "border-gray-100 hover:border-gray-300 hover:bg-gray-50 text-gray-700 bg-white"
                            }`}
                        >
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 text-center mr-4 text-sm font-medium flex-shrink-0 transition-all ${
                                isSelected 
                                    ? "bg-indigo-500 border-indigo-500 text-white" 
                                    : "bg-white border-gray-200 text-gray-400 group-hover:border-indigo-200 group-hover:text-indigo-400 group-hover:bg-indigo-50/30"
                            }`}>
                                {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="flex-1">{option}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
