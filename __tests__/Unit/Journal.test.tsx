import { delJournalFirestore, getJournalFirestore, saveJournalFirestore, updateJournalFirestore } from "../../infrastructure/services/firebase/Journal";

describe("Journal Unit Test", () => {
  let journalId: string;
  const journalData = {
    user_email: 'muhammad.hasyim.c.a@gmail.com', mood: 90,
    title: 'Testing', text: 'Testing'
  }

  const editJournalData = {
    user_email: 'muhammad.hasyim.c.a@gmail.com', mood: 95, id: '',
    title: 'Edit Testing', text: 'Edit Testing', date: Date.now()
  }

  it("should get my journal", async () => {
    await saveJournalFirestore(journalData)
    const data: any = await getJournalFirestore(journalData.user_email)
    const result = data.docs.map((doc: any) => {
      return { data: doc.data(), id: doc.id }
    })
    journalId = data.docs[0].id
    editJournalData.id = journalId
    expect(result.length).toBe(1)
  });

  it("should get my journal after edited", async () => {
    await updateJournalFirestore(editJournalData)
    const data: any = await getJournalFirestore(journalData.user_email)
    const result = data.docs[0].data()
    expect(result.mood).toBe(95)
    expect(result.title).toBe('Edit Testing')
    expect(result.text).toBe('Edit Testing')
  });

  it("should get no journal after deletion", async () => {
    await delJournalFirestore(journalId)
    const data: any = await getJournalFirestore(journalData.user_email)
    const result = data.docs
    expect(result).toStrictEqual([])
  });
});