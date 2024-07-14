// Copyright (c) 2024. Sendanor <info@sendanor.fi>. All rights reserved.

import { replaceAll } from "./replaceAll";

/**
 * Returns the string with each line prefixed with another string.
 *
 * @param value The value
 * @param prefix The prefix string
 */
export function prefixLines (
    value : string,
    prefix : string,
) : string {
    return `${ prefix }${ replaceAll(
        value,
        "\n",
        `\n${ prefix }`,
    ) }`;
}
