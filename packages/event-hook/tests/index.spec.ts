import 'mocha';
import {expect} from 'chai';
import {EventHook} from "../src";

describe('test', () => {
    it('test on', (done) => {
        const hook = new EventHook();
        const key = 'run';
        const params = ['A'];
        hook.on(key, (...rest: any[]) => {
            expect(rest).to.deep.equal(params);
            done();
        })
        hook.trigger(key, ...params);
    });

    it('test on override', (done) => {
        const hook = new EventHook();
        const key = 'run';
        const params = ['A'];
        let run = true;
        hook.on(key, () => {
            run = false;
        })
        hook.on(key, (...rest: any[]) => {
            if (run) {
                expect(rest).to.deep.equal(params);
                done();
            } else {
                done(new Error('test on override fail.'));
            }
        }, true)
        hook.trigger(key, ...params);
    });

    it('test off', (done) => {
        const hook = new EventHook();
        const key = 'run';
        const params = ['A'];
        let run = true;

        function cb() {
            run = false;
        }

        hook.on(key, cb)
        hook.off(key, cb)
        hook.trigger(key, ...params);
        if (run) {
            done();
        } else {
            done(new Error('test off fail.'));
        }
    });

    it('test destroy', (done) => {
        const hook = new EventHook();
        const key = 'run';
        const params = ['A'];
        let run = true;

        function cb() {
            run = false;
        }

        hook.on(key, cb)
        hook.destroy()
        hook.trigger(key, ...params);
        if (run) {
            done();
        } else {
            done(new Error('test destroy fail.'));
        }
    });

})
