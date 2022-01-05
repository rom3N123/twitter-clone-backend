import jwt from 'jsonwebtoken';
import ApiError from '../exceptions/ApiError.js';
import TokenModel from '../models/TokenModel.js';

class TokensService {
    async createPairOfTokens(userId) {
        const access = this.createAccessToken(userId);
        const refresh = await this.createRefreshToken(userId);

        return { access, refresh };
    }

    async createRefreshToken(userId) {
        const refreshToken = jwt.sign(
            { id: userId },
            process.env.JWT_REFRESH_SIGNATURE,
        );

        const token = await TokenModel.findOne({ userId });

        const currentTimestamp = Date.now();

        if (token && token.expiresIn < currentTimestamp) {
            return refreshToken;
        }

        const createPayload = {
            refreshToken,
            expiresIn: currentTimestamp,
            userId,
        };

        if (token) {
            token.refreshToken = createPayload.refreshToken;
            token.expiresIn = createPayload.expiresIn;
            token.save();
        } else {
            await TokenModel.create(createPayload);
        }

        return refreshToken;
    }

    createAccessToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_SIGNATURE, {
            expiresIn: '24h',
        });
    }

    refreshTokens(refreshToken) {
        try {
            const { id } = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SIGNATURE,
            );

            return this.createPairOfTokens(id);
        } catch (error) {
            throw ApiError.BadRequestError(error.message);
        }
    }

    getTokenFromRequest(req) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return null;
        }

        return (
            authHeader.split(' ')[0] === 'Bearer' && authHeader.split(' ')[1]
        );
    }

    deleteRefreshToken(userId) {
        return TokenModel.deleteOne({ userId }).exec();
    }
}

export default new TokensService();
