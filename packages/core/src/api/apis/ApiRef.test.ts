/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import ApiRef from './ApiRef';

describe('ApiRef', () => {
  it('should be created', () => {
    const ref = new ApiRef({ id: 'abc', description: '123' });
    expect(ref.id).toBe('abc');
    expect(ref.description).toBe('123');
    expect(String(ref)).toBe('apiRef{abc}');
    expect(() => ref.T).toThrow('tried to read ApiRef.T of apiRef{abc}');
  });

  it('should require a ascii letters only in id', () => {
    for (const id of ['a', 'abc', 'ABC', 'aBC', 'aBc']) {
      expect(new ApiRef({ id, description: '123' }).id).toBe(id);
    }

    for (const id of ['123', 'ab-c', 'ab_c', 'a2c', '', '_']) {
      expect(() => new ApiRef({ id, description: '123' }).id).toThrow(
        `API id must only contain ascii letters, got '${id}'`,
      );
    }
  });
});
