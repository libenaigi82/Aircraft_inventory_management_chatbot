export function formatResponse(intent, data) {

    return {

        success: true,

        timestamp: new Date(),

        intent,

        result: data

    };

}