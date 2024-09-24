export const errorHandler = (err, _req, res, next) => {
    // If you've already sent a response, return
    if (res.headersSent) {
        return next(err); // Pass the error to the default error handler
    }
    res.status(500).send('Something broke!');
}