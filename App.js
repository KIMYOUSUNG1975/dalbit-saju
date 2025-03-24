import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [gender, setGender] = useState('여자');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult('');

    const prompt = `사용자의 생년월일: ${birthDate}\n출생시간: ${birthTime}\n성별: ${gender}\n위 정보를 기반으로 전문가처럼 분석적인 사주 풀이를 해줘.\n항목: 성격 및 성향, 직업운, 연애운, 재물운. 문체는 전문적인 어투로.`;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'user', content: prompt }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer App.js:37 
 
AxiosError
code
: 
"ERR_BAD_REQUEST"
config
: 
{transitional: {…}, adapter: Array(3), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
message
: 
"Request failed with status code 401"
name
: 
"AxiosError"
request
: 
XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
response
: 
{data: {…}, status: 401, statusText: '', headers: AxiosHeaders, config: {…}, …}
status
: 
401
stack
: 
"AxiosError: Request failed with status code 401\n    at settle (http://localhost:3000/static/js/bundle.js:2186:12)\n    at XMLHttpRequest.onloadend (http://localhost:3000/static/js/bundle.js:823:66)\n    at Axios.request (http://localhost:3000/static/js/bundle.js:1322:41)\n    at async handleSubmit (http://localhost:3000/static/js/bundle.js:30450:24)"
[[Prototype]]
: 
Error
constructor
: 
ƒ AxiosError(message, code, config, request, response)
toJSON
: 
ƒ toJSON()
isAxiosError
: 
true
[[Prototype]]
: 
Object
constructor
: 
ƒ Error()
message
: 
""
name
: 
"Error"
toString
: 
ƒ toString()
[[Prototype]]
: 
Object
constructor
: 
ƒ Object()
hasOwnProperty
: 
ƒ hasOwnProperty()
isPrototypeOf
: 
ƒ isPrototypeOf()
propertyIsEnumerable
: 
ƒ propertyIsEnumerable()
toLocaleString
: 
ƒ toLocaleString()
toString
: 
ƒ toString()
valueOf
: 
ƒ valueOf()
__defineGetter__
: 
ƒ __defineGetter__()
__defineSetter__
: 
ƒ __defineSetter__()
__lookupGetter__
: 
ƒ __lookupGetter__()
__lookupSetter__
: 
ƒ __lookupSetter__()
__proto__
: 
(...)
get __proto__
: 
ƒ __proto__()
set __proto__
: 
ƒ __proto__()
length
: 
1
name
: 
"set __proto__"
arguments
: 
(...)
caller
: 
(...)
[[Prototype]]
: 
ƒ ()
[[Scopes]]
: 
Scopes[0]
속성 없음
handleSubmit	@	App.js:37`
          }
        }
      );

      setResult(response.data.choices[0].message.content);

    } catch (error) {
      console.error(error);
      setResult('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">🌙 달빛천사의운명노트</h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="birth-date" className="block text-sm font-medium mb-1">
              생년월일
            </label>
            <input
              id="birth-date"
              type="date"
              className="w-full border p-2 rounded"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              title="생년월일 입력"
            />
          </div>

          <div>
            <label htmlFor="birth-time" className="block text-sm font-medium mb-1">
              태어난 시간
            </label>
            <input
              id="birth-time"
              type="text"
              placeholder="예: 오전 9시"
              className="w-full border p-2 rounded"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
              title="태어난 시간 입력"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium mb-1">
              성별
            </label>
            <select
              id="gender"
              className="w-full border p-2 rounded"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              title="성별 선택"
            >
              <option value="여자">여자</option>
              <option value="남자">남자</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-purple-500 text-white py-2 rounded-xl hover:bg-purple-600 transition"
          >
            {loading ? '풀이 중...' : '사주풀이 보기'}
          </button>
        </div>

        {result && (
          <div className="mt-6 whitespace-pre-wrap bg-gray-50 p-4 rounded-xl border text-sm leading-relaxed">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
