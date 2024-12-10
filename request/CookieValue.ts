import {CookieValueMetadataUtils} from "../data/utils/CookieValueMetadataUtils";
import {CookieValueMetadata} from "../data/types/CookieValueMetadata.ts";


export const CookieValue = (cookieName: string): ParameterDecorator => {
    return (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
      const key = propertyKey || 'default';
      const metadata: CookieValueMetadata = new CookieValueMetadata(
        cookieName,
        parameterIndex,
        undefined, // domain
        undefined, // httpOnly
        undefined, // maxAge
        undefined, // path
        undefined, // sameSite
        undefined, // secure
        undefined  // expires
      );

      CookieValueMetadataUtils.setCookieMetadata(metadata, cookieName, propertyKey);
    }
}