import { delCircleFirestore, getMyCircleFirestore, saveCircleFirestore, updateCircleFirestore } from "../../infrastructure/services/firebase/Circle";

describe("Circle Unit Test", () => {
   let circleId: string;
   const circleData = {
      owner: 'muhammad.hasyim.c.a@gmail.com',
      name: 'test cirlce',
      gmeetLink: '#',
      capacity: 2,
      desc: 'test cirlce',
      filled: 0, members: []
   }

   const editCircleData = {
      id: '',
      name: 'test cirlce edit',
      capacity: 10,
      desc: 'test cirlce edit'
   }

   const applyCircle = {
      id: '',
      member_name: '191111006@mhs.stiki.ac.id',
      members: ['191111006@mhs.stiki.ac.id'],
      filled: 1
   }

   const leaveCircle = {
      id: '',
      members: [],
      filled: 0
   }

   it("should get my circle after Creation", async () => {
      await saveCircleFirestore(circleData)
      const data: any = await getMyCircleFirestore(circleData.owner)
      const result = data.docs.map((doc: any) => {
         return { data: doc.data(), id: doc.id }
      })
      circleId = data.docs[0].id
      editCircleData.id = circleId
      applyCircle.id = circleId
      leaveCircle.id = circleId
      expect(result.length).toBe(1)
   });

   it("should get my circle after edited", async () => {
      await updateCircleFirestore(editCircleData)
      const data: any = await getMyCircleFirestore(circleData.owner)
      const result = data.docs[0].data()
      expect(result.name).toBe(editCircleData.name)
      expect(result.capacity).toBe(editCircleData.capacity)
      expect(result.desc).toBe(editCircleData.desc)
   });

   it("should get my circle after someone applied", async () => {
      await updateCircleFirestore(applyCircle)
      const data: any = await getMyCircleFirestore(circleData.owner)
      const result = data.docs[0].data()
      expect(result.members.length).toBe(1)
      expect(result.filled).toBe(1)
   });

   it("should get my circle after someone leave", async () => {
      await updateCircleFirestore(leaveCircle)
      const data: any = await getMyCircleFirestore(circleData.owner)
      const result = data.docs[0].data()
      expect(result.members.length).toBe(0)
      expect(result.filled).toBe(0)
   });

   it("should get no circle after deletion", async () => {
      await delCircleFirestore(circleId)
      const data: any = await getMyCircleFirestore(circleData.owner)
      const result = data.docs
      expect(result).toStrictEqual([])
   });
});