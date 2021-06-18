/** Hash a password */
export declare function hash(password: string, keyPass: string, iteration?: number): Promise<string>;
/** Compare a password to a hash and see if they the same */
export declare function Verify(password: string, hashed: string, keyPass: string): Promise<boolean>;
