export interface Exam {
  text: string;
  description: string;
  startedAt: Date;
  endedAt: Date;
  allowAnonymous: true;
  status: "active";
  period: {
    name: string;
    statedAt: Date;
    endedAt: Date;
    grades: [
      {
        subject: {
          code: string;
          title: string;
          codeId: 0;
          course: {
            code: string;
            title: string;
            subjects: [null];
            id: 0;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date;
          };
          grades: [null];
          id: 0;
          createdAt: Date;
          updatedAt: Date;
          deletedAt: Date;
        };
        answers: [
          {
            score: 0;
            type: "Answer";
            examAgreement: {
              uuid: string;
              anonymous: true;
              userId: 0;
              id: 0;
              createdAt: Date;
              updatedAt: Date;
              deletedAt: Date;
            };
            id: 0;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date;
          },
        ];
        id: 0;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date;
      },
    ];
    exams: [null];
    id: 0;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  };
  groups: [
    {
      title: string;
      class: true;
      personal: true;
      position: 0;
      examId: 0;
      questions: [
        {
          statement: string;
          imageUrl: string;
          imageAlt: string;
          required: true;
          groupId: 0;
          position: 0;
          id: 0;
          createdAt: Date;
          updatedAt: Date;
          deletedAt: Date;
        },
      ];
      id: 0;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date;
    },
  ];
  id: 0;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
