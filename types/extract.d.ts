export enum TaskStep {
    FILE_UPLOAD = 'FILE_UPLOAD',
    TEXT_DETECTION = 'TEXT_DETECTION',
    OPENAI_PROCESSING = 'OPENAI_PROCESSING',
    DATABASE_ENTRY = 'DATABASE_ENTRY',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED'
  }
  
   export interface StepStatus {
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
    startTime?: Date;
    endTime?: Date;
    duration?: number;
  }
  
  export interface TrackingData {
    taskId: string;
    currentStage: TaskStep;
    stages: {
      fileUpload: StepStatus;
      textDetection: StepStatus;
      openAIProcessing: StepStatus;
      databaseEntry: StepStatus;
    };
    progress: {
      currentStep: number;
      totalSteps: number;
      percentageComplete: number;
    };
    metadata: {
      startTime: Date;
      lastUpdated: Date;
    };
    error?: {
      stage: TaskStep;
      message: string;
      timestamp: Date;
    };
  }