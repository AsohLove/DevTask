
export function validate(schema){

    return (request, response, next) => {

        const result = schema.safeParse(
            request.body
        );

        if (!request.success) {
            return response.status(400).json({
                error: "Validation failed",
                details: result.error.issues
            });
        }

        request.body = result.data;

        next();
    };
}