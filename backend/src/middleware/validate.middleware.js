
export function validate(schema){

    return (request, response, next) => {

        const result = schema.safeParse(
            request.body
        );

        if (!result.success) {
            return response.status(400).json({
                error: "Validation failed",
                details: result.error.issues
            });
        }

        request.body = result.data;

        next();
    };
}

export function validateParams(schema) {

  return (request, response, next) => {

    const result =
      schema.safeParse(
        request.params
      );


    if (!result.success) {

      return response.status(400).json({
        error: "Invalid route parameters",
        details: result.error.issues
      });

    }


    request.params =
      result.data;

    next();

  };

}