import { saveScheduleFirestore, getAllScheduleFirestore, updateScheduleFirestore, delScheduleFirestore } from "../../infrastructure/services/firebase/Schedule";

describe("Consultation Schedule Unit Test", () => {
  let scheduleId: string;
  const scheduleData = {
    counselor_email: '191111006@mhs.stiki.ac.id',
    counselor_name: 'Mr. Leslar Counselor',
    gmeetLink: '#',
    session: '1'
  }

  const editScheduleData = {
    id: '', session: '2'
  }

  const applySchedule = {
    id: '',
    patient_email: 'muhammad.hasyim.c.a@gmail.com',
    patient_name: 'Muhammad Hasyim Chaidir Ali',
    summary: 'saya ingin masuk ...'
  }

  it("should get my Consultation Schedule after Creation", async () => {
    await saveScheduleFirestore(scheduleData)
    const data: any = await getAllScheduleFirestore()
    const result = data.docs.map((doc: any) => {
      return { data: doc.data(), id: doc.id }
    })
    scheduleId = data.docs[0].id
    editScheduleData.id = scheduleId
    applySchedule.id = scheduleId
    expect(result.length).toBe(1)
  });

  it("should get my Consultation Schedule after session edited to 2", async () => {
    await updateScheduleFirestore(editScheduleData)
    const data: any = await getAllScheduleFirestore()
    const result = data.docs[0].data()
    expect(result.session).toBe(editScheduleData.session)
  });

  it("should get my Consultation Schedule after someone applied", async () => {
    await updateScheduleFirestore(applySchedule)
    const data: any = await getAllScheduleFirestore()
    const result = data.docs[0].data()
    expect(result.patient_email).toBe(applySchedule.patient_email)
    expect(result.patient_name).toBe(applySchedule.patient_name)
    expect(result.summary).toBe(applySchedule.summary)
  });

  it("should get no Consultation Schedule after deletion", async () => {
    await delScheduleFirestore(scheduleId)
    const data: any = await getAllScheduleFirestore()
    const result = data.docs
    expect(result).toStrictEqual([])
  });
});