/*
 *
 * Copyright 2016, Google Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
'use strict';

import {expect} from 'chai';

describe('The PathTemplate parser', () => {
  it('should load the pegjs generated module ok', () => {
    const parser = require('../src/path_template_parser');
    expect(parser).to.not.eql(null);
  });

  describe('function `parse`', () => {
    const parser = require('../src/path_template_parser');

    it('should succeed with valid inputs', () => {
      const shouldPass = () => {
        parser.parse('a/b/**/*/{a=hello/world}');
      };
      expect(shouldPass).to.not.throw();
    });

    it('should fail on invalid tokens', () => {
      const shouldFail = () => {
        parser.parse('hello/wor* ld}');
      };
      expect(shouldFail).to.throw();
    });

    it('should fail on unexpected eof', () => {
      const shouldFail = () => {
        parser.parse('a/{hello=world');
      };
      expect(shouldFail).to.throw();
    });

    it('should fail on inner binding', () => {
      const shouldFail = () => {
        parser.parse('buckets/{hello={world}}');
      };
      expect(shouldFail).to.throw();
    });
  });
});
