export class User {

    firstName: string;
    lastName: string;
    description: string;
    personalWebsite: string;
    country: string;
    email: string;
    profilePicture: {
        pictureUrl: string
    };
    languages: [{
        language: string,
        languageLevel: {
            languageLevel: string
        }
    }];
    workSpheres: [{
        workSphere: string,
        subSpheres: [{
            subSphere: string
        }]
    }];
    skills: [{
        skill: string,
        skillLevel: {
            skillLevel: string
        }
    }];
    educations: [{
        country: {
            country: string
        },
        universityName: string,
        titleType: {
            titleType: string
        },
        educationSubject: string,
        graduationYear: number
    }];
    certificates: [{
        certificateSubject: String,
        awardedFrom: string,
        graduationYear: number
    }]
}