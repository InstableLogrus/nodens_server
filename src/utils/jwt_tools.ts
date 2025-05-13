import * as jose from 'jose'
import { JWSSignatureVerificationFailed } from 'jose/errors';

/**
 * functions to create / verify token -> JWE
 *
 *  note:   on JWT payload https://www.iana.org/assignments/jwt/jwt.xhtml
 *          algo keys https://github.com/panva/jose/issues/210#jwe-alg
 */

// create a JWE token @TODO: relocate issuer and audience values in .env
const createEncryptedToken = async (payload: jose.JWTPayload, secret: string, expirationTime: string | number = '2h') => {
    const s = jose.base64url.decode(secret);

    const jwt = await new jose.EncryptJWT(payload)
        .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
        .setIssuedAt()
        .setIssuer('urn:nodens:issuer')
        .setAudience('urn:nodens:audience')
        .setExpirationTime(expirationTime)
        .encrypt(s)

    return jwt;
}

// verify a JWE token (with issuer and audience of the app) @TODO: relocate issuer and audience values in .env
const verifyEncryptedToken = async (token: string, secret: string) => {
    const s = jose.base64url.decode(secret);
    try {
        const { payload, protectedHeader } = await jose.jwtDecrypt(token, s,
            {
                issuer: 'urn:nodens:issuer',
                audience: 'urn:nodens:audience',
            }
        );
        return { payload, protectedHeader }
    }
    catch (error : any) {
        throw error;
    }
}




export { createEncryptedToken, verifyEncryptedToken };