import streamlit as st
import openai

st.set_page_config(page_title="달빛천사속삭임", page_icon="🌙")

openai.api_key = "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"

st.title("🌙 달빛천사속삭임")
st.markdown("달빛천사가 당신에게만 운명의 속삭임을 들려드릴게요 아래정보를 입력하세요")

# 입력 폼
birthdate = st.date_input("생년월일")

birthtime = st.text_input("태어난 시간 (예: 오전 10시)")

gender = st.selectbox("성별", ["여자", "남자"])

if st.button("🔮 사주풀이 보기"):
    with st.spinner("좋은 꿈 같은 하루 달빛천사와 함께 해요"):

        prompt = f"""
        사용자의 생년월일: {birthdate}
        태어난 시간: {birthtime}
        성별: {gender}
        위 정보를 바탕으로 전문가처럼 분석적인 사주 풀이를 해줘.
        항목: 성격 및 성향, 직업운, 연애운, 재물운.
        문체는 전문적인 어투로.
        """

        try:
            response = openai.ChatCompletion.create(
                model="gpt-4.0",
                messages=[{"role": "user", "content": prompt}]
            )
            result = response.choices[0].message.content
            st.success("🔍 사주풀이 결과")
            st.write(result)

        except Exception as e:
            st.error(f"오류 발생: {e}")
