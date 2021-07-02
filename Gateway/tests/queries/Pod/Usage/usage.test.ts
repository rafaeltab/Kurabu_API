import { IQueryResultStatus } from '#gqueries/IQuery';
import { PodUsageQueryHandler } from '#gqueries/Pod/Usage/PodUsageQueryHandler';
import { expect } from 'chai';

export function Usage() {
    describe("Usage", () => {
        it("Handle should succeed", async () => {
            var sut = new PodUsageQueryHandler();

            var result = await sut.handle({});

            expect(result.success).to.be.equal(IQueryResultStatus.SUCCESS);
        });
    });
}
