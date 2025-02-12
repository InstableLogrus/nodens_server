import jwt from 'jsonwebtoken';

// refresh access token (make a new access token and anoth refresh token with the same expiration)
const userRefresh = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    // const { refreshToken } = req.body;

    // console.log("refresh token via cookie: ", refreshToken);

    if (refreshToken == null) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.JWT_SECRET as string, (err: any, payload: any) => {

        if (err) {
            res.sendStatus(403);
        }

        // console.log("refresh: ", payload);

        const {email, name, exp, ...rest} = payload;
        const payload_access = {email, name};
        const payload_refresh = {email, name, exp} ;

        const accessToken = jwt.sign(payload_access, process.env.JWT_SECRET, { expiresIn: 60 }); // 60 pour test
        const refreshToken = jwt.sign(payload_refresh, process.env.JWT_SECRET);

        // refresh token as httponly cookie 
        res.cookie('refreshToken', refreshToken, {
            expires: new Date(Date.now() + 48 * 3600000), // cookie will be removed after 48 hours (test)
            httpOnly: true, // JS can't read it
            secure: false, // should be true in prod
            sameSite: 'lax', // dev
            devdomain: "localhost", // dev
        })

        // access token as json for app to access it (easier for debug)
        res.json({
            accessToken /*, refreshToken*/
        });

        // return res.sendStatus(400);
    });

}

export default userRefresh;